import { Request, Response } from "express";
import { prisma } from "../lib/db";

export const KategoriController = {
// GET ALL KATEGORI
getAll: async (req: Request, res: Response) => {
try {
const kategori = await prisma.kategori.findMany({
include: {
berita: true,
},
orderBy: {
createdAt: "desc",
},
});


  return res.status(200).json({
    success: true,
    data: kategori,
  });
} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}


},

// GET KATEGORI BY ID
getById: async (req: Request, res: Response) => {
try {
const id = Number(req.params.id);


  const kategori = await prisma.kategori.findUnique({
    where: {
      id,
    },
    include: {
      berita: true,
    },
  });

  if (!kategori) {
    return res.status(404).json({
      success: false,
      message: "Kategori tidak ditemukan",
    });
  }

  return res.status(200).json({
    success: true,
    data: kategori,
  });
} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}


},

// CREATE KATEGORI
create: async (req: Request, res: Response) => {
try {
const { nama } = req.body;


  if (!nama) {
    return res.status(400).json({
      success: false,
      message: "Nama kategori wajib diisi",
    });
  }

  const slug = nama
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const existingKategori = await prisma.kategori.findFirst({
    where: {
      OR: [
        { nama },
        { slug }
      ],
    },
  });

  if (existingKategori) {
    return res.status(409).json({
      success: false,
      message: "Kategori sudah ada",
    });
  }

  const kategori = await prisma.kategori.create({
    data: {
      nama,
      slug,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Kategori berhasil dibuat",
    data: kategori,
  });
} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}


},

// UPDATE KATEGORI
update: async (req: Request, res: Response) => {
try {
const id = Number(req.params.id);
const { nama } = req.body;

  const slug = nama
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const kategori = await prisma.kategori.update({
    where: {
      id,
    },
    data: {
      nama,
      slug,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Kategori berhasil diupdate",
    data: kategori,
  });
} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}


},

// DELETE KATEGORI
delete: async (req: Request, res: Response) => {
try {
const id = Number(req.params.id);

  await prisma.kategori.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Kategori berhasil dihapus",
  });
} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
}

},
};
