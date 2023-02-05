import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FnsRegistryResolver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  blockNumber: number;

  @Column()
  type: string;

  @Column()
  resolver: string;

  @Column()
  resolverFilAddress: string;

  @Column()
  transactionHash: string;

  @Column()
  owner: string;
}
