import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

import { Team } from '@/modules/users/entities/team.entity'
import { User } from '@/modules/users/entities/user.entity'

@Entity({ name: 'departments' })
export class Department {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@OneToOne(() => User, user => user.departmentHead)
	headBy: User

	@OneToMany(() => User, user => user.department)
	members: User[]

	@OneToMany(() => Team, team => team.department)
	teams: Team[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<Department>) {
		Object.assign(this, partial)
	}
}
