import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { amount, status, paymentMethod } = await request.json();

    if (!amount || !status || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'amount, status e paymentMethod são obrigatórios' },
        { status: 400 },
      );
    }

    const data = await prisma.transaction.create({
      data: { amount, status, paymentMethod },
    });

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/transactions]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}