import { decodeJwt } from 'jose';

import { User } from '@/models/user';

import { HavanJwtPayload } from '../models/havan-jwt-payload';

export const logoutTabChannel = new BroadcastChannel('logout');

export function getUserInfoFromJwt(token: string): User {
  const { id, sub, nom, emp, fil, loc, luc, pla, est, role } = decodeJwt(
    token
  ) as HavanJwtPayload;

  return {
    id,
    matricula: sub,
    nome: nom,
    empresa: emp,
    filial: fil,
    localDeEstoque: loc,
    centroDeLucro: luc,
    planta: pla,
    tipoDeEstoque: est,
    perfil: role,
  };
}
