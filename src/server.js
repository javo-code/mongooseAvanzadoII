import express from "express";
import handlebars from "express-handlebars";

import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from './routes/views.router.js';
import chatRouter from './routes/chat.router.js';/* 
import usersRouter from './routes/users.router.js'; */

import { Server } from "socket.io";
import fs from 'fs';
import { productDaoFS } from './dao/fileSystem/products.dao.js';

import MessagesDaoFS from './dao/fileSystem/chat.dao.js';
import { MessageModel } from "./dao/mongoDB/models/chat.model.js";
const msgDaoFS = new MessagesDaoFS(__dirname + '/data/messages.json');

import "./db/connection.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);/* 
app.use('/api/users', usersRouter); */

app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Escuchando en el puerto: ${PORT}`);
});

const socketServer = new Server(httpServer);
let products = []; // Array de productos
fs.readFile('src/data/products.json', 'utf-8', (err, data) => {
  if (!err) {
    products = JSON.parse(data);
  } else {
    console.error('Error al cargar los productos del archivo:', err);
  }
});

socketServer.on('connection', async (socket) => {
  console.log('✔ Cliente conectado');

  
  socket.emit('arrayProducts', products);

  socket.on('newProduct', (product) => {
    
    products.push(product);

    socketServer.emit('arrayProducts', products);

    
    fs.writeFile('src/data/products.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar los productos:', err);
      } else {
        console.log('Productos guardados exitosamente en "products.json"');

        
        socketServer.emit('newProductAdded', product);
      }
    });
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await productDaoFS.deleteProduct(parseInt(productId));
      const updatedProducts = await productDaoFS.getProducts();

      
      socketServer.emit('arrayProducts', updatedProducts);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  });

    console.log('🟢 ¡New connection!', '✨' + socket.id + '✨');
    socketServer.emit('messages', await msgDaoFS.getAll());

    socket.on('disconnect', ()=>console.log('🔴 ¡User disconnect!', socket.id));
    socket.on('newUser', (user)=>console.log(`⏩ ${user} inició sesión`));

    socket.on('chat:message', async(msg)=>{
        await msgDaoFS.createMsg(msg);
        socketServer.emit('messages', await msgDaoFS.getAll());
    })

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user)
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
  
  socket.on('chat:message', async (message) => {
    try {
        await MessageModel.create(message);
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
    }
});
})