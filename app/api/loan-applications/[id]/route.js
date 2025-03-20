import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma/client';

// PATCH endpoint to update a loan application status
export async function PATCH(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const { status } = body;

    // Map frontend status to database enum
    let dbStatus;
    switch (status) {
      case 'approved':
        dbStatus = 'APPROVED';
        break;
      case 'rejected':
        dbStatus = 'REJECTED';
        break;
      case 'pending':
      default:
        dbStatus = 'PENDING';
        break;
    }

    // Update the loan application
    const updatedApplication = await prisma.loanApplication.update({
      where: { id },
      data: {
        status: dbStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Loan application status updated successfully',
      application: {
        id: updatedApplication.id,
        status: updatedApplication.status.toLowerCase(),
      },
    });
  } catch (error) {
    console.error('Error updating loan application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update loan application status' },
      { status: 500 }
    );
  }
} 