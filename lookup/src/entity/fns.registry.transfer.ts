import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FnsRegistryTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  blockNumber: number;

  @Column()
  type: string;

  @Column()
  owner: string;

  @Column()
  ownerFilAddress: string;

  @Column()
  transactionHash: string;
}
