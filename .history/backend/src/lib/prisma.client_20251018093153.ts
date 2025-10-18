// src/client.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
import { Injectable } from '@nestjs/common';