import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

import { UserTitleEnum, UserWorkStatusEnum } from '@/enums/user.enum'
import { Department } from '@/modules/users/entities/department.entity'
import { Team } from '@/modules/users/entities/team.entity'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ApiProperty()
	@Column({ unique: true })
	employeeId: string

	@ApiProperty()
	@Column()
	fullName: string

	@ApiProperty()
	@Column({ unique: true })
	email: string

	@ApiProperty()
	@Column({ unique: true })
	phone: string

	@ApiProperty()
	@Column({ nullable: true })
	@Exclude()
	password: string

	@ApiProperty()
	@Column({
		type: 'enum',
		enum: UserTitleEnum,
		default: UserTitleEnum.EMPLOYEE
	})
	userTitle: UserTitleEnum

	@ApiProperty()
	@Column({
		type: 'enum',
		enum: UserWorkStatusEnum,
		default: UserWorkStatusEnum.NOT_YET_ACCEPTED
	})
	workStatus: UserWorkStatusEnum

	@ApiProperty()
	@Column({ default: false })
	@Exclude()
	isActive: boolean

	@OneToOne(() => Department, department => department.headBy)
	@JoinColumn()
	departmentHead: Department

	@ManyToOne(() => Department, department => department.members)
	department: Department

	@ManyToMany(() => Team, team => team.managers)
	@JoinTable()
	managerOf: Team[]

	@ManyToMany(() => Team, team => team.members)
	@JoinTable()
	memberOf: Team[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<User>) {
		Object.assign(this, partial)
	}
}
