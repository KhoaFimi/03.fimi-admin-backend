import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

import { Department } from '@/modules/users/entities/department.entity'
import { User } from '@/modules/users/entities/user.entity'

@Entity({ name: 'teams' })
export class Team {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@ManyToOne(() => Department, department => department.teams)
	department: Department

	@ManyToMany(() => User, user => user.managerOf)
	managers: User[]

	@ManyToMany(() => User, user => user.memberOf)
	members: User[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<Team>) {
		Object.assign(this, partial)
	}
}
