import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from './Order';
import Tool from './Tool';

@Entity('orders_tools')
class OrdersTools {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_tools)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Tool, tool => tool.order_tools)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @Column()
  tool_id: string;

  @Column()
  order_id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersTools;
