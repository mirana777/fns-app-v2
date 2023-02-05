import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FnsPublicResolverAddressChanged {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  blockNumber: number;

  @Column()
  type: string;

  @Column()
  node: string;

  @Column()
  newAddress: string;

  @Column()
  coinType: number;

  @Column()
  transactionHash: string;

  @Column()
  owner: string;
}
