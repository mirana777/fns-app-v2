import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FnsRegistrarRegistered {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  blockNumber: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  ownerFilAddress: string;

  @Column()
  expires: number;

  @Column()
  transactionHash: string;
}
