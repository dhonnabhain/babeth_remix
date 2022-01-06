import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { supabase } from '../../plugins/supabase'

export function middleware(req: NextRequest, ev) {
  // let token = req.cookies['sb:token']

  // if (!token) {
  //   return NextResponse.redirect('/')
  // }

  return NextResponse.next()
}
