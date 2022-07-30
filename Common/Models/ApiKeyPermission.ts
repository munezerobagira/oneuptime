import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
} from 'typeorm';
import BaseModel from './BaseModel';
import User from './User';
import CrudApiEndpoint from '../Types/Database/CrudApiEndpoint';
import Route from '../Types/API/Route';
import TableColumnType from '../Types/Database/TableColumnType';
import TableColumn from '../Types/Database/TableColumn';
import ColumnType from '../Types/Database/ColumnType';
import ObjectID from '../Types/ObjectID';
import ColumnLength from '../Types/Database/ColumnLength';
import Permission from '../Types/Permission';
import Label from './Label';
import ApiKey from './ApiKey';
import Project from './Project';
import ProjectColumn from '../Types/Database/ProjectColumn';
import TableAccessControl from '../Types/Database/AccessControl/TableAccessControl';
import ColumnAccessControl from '../Types/Database/AccessControl/ColumnAccessControl';
import EntityName from '../Types/Database/EntityName';

@TableAccessControl({
    create: [
        Permission.ProjectOwner,
        Permission.CanCreateProjectApiKey,
        Permission.CanEditProjectApiKeyPermissions,
    ],
    read: [
        Permission.ProjectOwner,
        Permission.CanReadProjectApiKey,
        Permission.ProjectMember,
    ],
    delete: [
        Permission.ProjectOwner,
        Permission.CanDeleteProjectApiKey,
        Permission.CanEditProjectApiKeyPermissions,
    ],
    update: [
        Permission.ProjectOwner,
        Permission.CanEditProjectApiKeyPermissions,
        Permission.CanEditProjectApiKey,
    ],
})
@ProjectColumn('projectId')
@CrudApiEndpoint(new Route('/api-key-permission'))
@Entity({
    name: 'ApiKeyPermission',
})
@EntityName('Permission', 'Permissions')
export default class APIKeyPermission extends BaseModel {
    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [
            Permission.ProjectOwner,
            Permission.CanEditProjectApiKeyPermissions,
        ],
    })
    @TableColumn({
        manyToOneRelationColumn: 'apiKeyId',
        type: TableColumnType.Entity,
    })
    @ManyToOne(
        (_type: string) => {
            return ApiKey;
        },
        {
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'apiKeyId' })
    public apiKey?: ApiKey;

    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @TableColumn({
        manyToOneRelationColumn: 'projectId',
        type: TableColumnType.Entity,
    })
    @ManyToOne(
        (_type: string) => {
            return Project;
        },
        {
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'projectId' })
    public project?: Project;

    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @Index()
    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public projectId?: ObjectID;

    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @Index()
    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public apiKeyId?: ObjectID;

    @ColumnAccessControl({
        create: [Permission.ProjectOwner, Permission.CanCreateProjectApiKey],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @TableColumn({
        manyToOneRelationColumn: 'createdByUserId',
        type: TableColumnType.Entity,
    })
    @ManyToOne(
        (_type: string) => {
            return User;
        },
        {
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'createdByUserId' })
    public createdByUser?: User;

    @ColumnAccessControl({
        create: [Permission.ProjectOwner, Permission.CanCreateProjectApiKey],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public createdByUserId?: ObjectID;

    @ColumnAccessControl({
        create: [Permission.ProjectOwner, Permission.CanCreateProjectApiKey],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [],
    })
    @TableColumn({
        manyToOneRelationColumn: 'deletedByUserId',
        type: TableColumnType.ObjectID,
    })
    @ManyToOne(
        (_type: string) => {
            return User;
        },
        {
            cascade: false,
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'deletedByUserId' })
    public deletedByUser?: User;

    @ColumnAccessControl({
        create: [],
        read: [Permission.ProjectMember],
        update: [],
    })
    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public deletedByUserId?: ObjectID;

    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [
            Permission.ProjectOwner,
            Permission.CanEditProjectApiKeyPermissions,
            Permission.CanEditProjectApiKey,
        ],
    })
    @TableColumn({ required: true, type: TableColumnType.ShortText })
    @Column({
        nullable: false,
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
    })
    public permission?: Permission = undefined;

    @ColumnAccessControl({
        create: [
            Permission.ProjectOwner,
            Permission.CanCreateProjectApiKey,
            Permission.CanEditProjectApiKeyPermissions,
        ],
        read: [
            Permission.ProjectOwner,
            Permission.CanReadProjectApiKey,
            Permission.ProjectMember,
        ],
        update: [
            Permission.ProjectOwner,
            Permission.CanEditProjectApiKeyPermissions,
            Permission.CanEditProjectApiKey,
        ],
    })
    @TableColumn({ required: true, type: TableColumnType.Array })
    @ManyToMany(() => {
        return Label;
    })
    @JoinTable()
    public labels?: Array<Label>;
}
