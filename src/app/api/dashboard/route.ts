import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/features/dashboard/services';
import { DateRangeFilter } from '@/features/dashboard';

/**
 * GET /api/dashboard
 *
 * Query params:
 *   startDate  – ISO date string  (e.g. 2024-01-01)
 *   endDate    – ISO date string  (e.g. 2024-12-31)
 *
 * Returns the full dashboard payload in a single request.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const filter: DateRangeFilter = {
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
    };

    const data = await dashboardService.getDashboardData(filter);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[GET /api/dashboard]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}