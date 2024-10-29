import { NextResponse } from 'next/server';
import services from '@/app/api/data/services.json';
import { v4 as uuid } from 'uuid';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  // const services = [
  //   {
  //     name: 'YouTube Channel Growth Hacking Services',
  //     description: 'YouTube Channel Growth Hacking Services',
  //     category: 'YouTube',
  //     serviceTypes: [
  //       {
  //         name: 'Growth Hacking Services',
  //         description: 'YouTube Channel Growth Hacking Services',
  //         variants: [
  //           {
  //             name: 'YouTube Channel Growth Hacking Services',
  //             description: 'YouTube Channel Growth Hacking Services',
  //             price: 1000
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  const responseResult = services;

  return NextResponse.json(responseResult);
}
