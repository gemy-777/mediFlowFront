import { Idoctor } from './idoctor';

export interface Iappointmets {
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: {};
  docData: Idoctor;
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
  _id: string;
  _v: any;
}
