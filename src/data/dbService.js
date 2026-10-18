// src/services/dbService.js
import { initialDatabase } from './mockDatabase';

const DB_KEY = 'f4a_database';

// Inicializar base de datos en localStorage
export const initDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(initialDatabase));
    }
};

// Obtener todos los datos con respaldo seguro
const getDB = () => {
    initDB();
    const db = localStorage.getItem(DB_KEY);
    if (!db) return initialDatabase;

    const database = JSON.parse(db);
    const initialProducts = new Map(initialDatabase.productos.map(producto => [producto.id, producto]));
    let imagesUpdated = false;

    database.productos = (database.productos || []).map(producto => {
        const initialProduct = initialProducts.get(producto.id);
        const hasOldImage = typeof producto.imagen === 'string' && (
            producto.imagen.includes('via.placeholder.com') ||
            producto.imagen === '/images/minecraft.webp'
        );

        if (initialProduct && hasOldImage) {
            imagesUpdated = true;
            return { ...producto, imagen: initialProduct.imagen };
        }

        return producto;
    });

    if (imagesUpdated) saveDB(database);
    return database;
};

// Guardar cambios
const saveDB = (data) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
};

// ==========================================
// 1. MÓDULO PRODUCTOS (CRUD)
// ==========================================
export const productoService = {
    getAll: () => getDB().productos || [],

    getAllWithCategory: () => {
        const db = getDB();
        return (db.productos || []).map(producto => ({
            ...producto,
            categoria: db.categorias?.find(categoria => categoria.id === producto.categoriaId)?.nombre || 'Sin categoría'
        }));
    },

    getById: (id) => (getDB().productos || []).find(p => p.id === Number(id)),

    getCriticos: (limiteStock = 5) => (getDB().productos || []).filter(p => p.stock <= limiteStock),

    getOfertas: () => (getDB().productos || []).filter(p => p.esOferta),

    create: (nuevoProducto) => {
        const db = getDB();
        const producto = { ...nuevoProducto, id: Date.now() };
        db.productos.push(producto);
        saveDB(db);
        return producto;
    },

    update: (id, productoActualizado) => {
        const db = getDB();
        db.productos = db.productos.map(p => p.id === Number(id) ? { ...p, ...productoActualizado } : p);
        saveDB(db);
    },

    delete: (id) => {
        const db = getDB();
        db.productos = db.productos.filter(p => p.id !== Number(id));
        saveDB(db);
    }
};

// ==========================================
// 2. MÓDULO USUARIOS (CRUD + Auth)
// ==========================================
export const usuarioService = {
    getAll: () => getDB().usuarios || [],

    login: (correo, password) => {
        const usuarios = getDB().usuarios || [];
        return usuarios.find(u => u.correo === correo && u.password === password) || null;
    },

    create: (nuevoUsuario) => {
        const db = getDB();
        const usuario = { ...nuevoUsuario, id: Date.now(), rol: 'cliente' };
        db.usuarios.push(usuario);
        saveDB(db);
        return usuario;
    },

    update: (id, datosActualizados) => {
        const db = getDB();
        db.usuarios = db.usuarios.map(u => u.id === Number(id) ? { ...u, ...datosActualizados } : u);
        saveDB(db);
    }
};

// ==========================================
// 3. MÓDULO VENTAS / ÓRDENES (CRUD)
// ==========================================
export const ventaService = {
    getAll: () => getDB().ventas || [],

    getByUsuarioId: (usuarioId) => (getDB().ventas || []).filter(v => v.usuarioId === Number(usuarioId)),

    crearOrden: (datosOrden) => {
        const db = getDB();
        const nuevaOrden = {
            id: `ORDER${Math.floor(10000 + Math.random() * 90000)}`,
            nroBoleta: Math.floor(20240000 + Math.random() * 10000),
            fecha: new Date().toISOString().split('T')[0],
            ...datosOrden
        };

        // Descontar stock de productos
        nuevaOrden.items.forEach(item => {
            const prod = db.productos.find(p => p.id === item.productoId);
            if (prod) {
                prod.stock = Math.max(0, prod.stock - item.cantidad);
            }
        });

        db.ventas.push(nuevaOrden);
        saveDB(db);
        return nuevaOrden;
    }
};

// ==========================================
// 4. MÓDULO DE TICKETS DE SOPORTE
// ==========================================
export const ticketService = {
    getAll: () => getDB().tickets || [],

    create: (datosTicket) => {
        const db = getDB();
        db.tickets = db.tickets || [];
        const ticket = {
            id: `TICKET-${Date.now()}`,
            fecha: new Date().toISOString(),
            estado: 'Pendiente',
            ...datosTicket
        };
        db.tickets.unshift(ticket);
        saveDB(db);
        return ticket;
    },

    updateStatus: (id, estado) => {
        const db = getDB();
        db.tickets = (db.tickets || []).map(ticket =>
            ticket.id === id ? { ...ticket, estado } : ticket
        );
        saveDB(db);
    }
};

// ==========================================
// 5. MÓDULO BLOGS
// ==========================================
export const blogService = {
    getAll: () => getDB().blogs || [],

    getById: (id) => (getDB().blogs || []).find(b => String(b.id) === String(id))
};
