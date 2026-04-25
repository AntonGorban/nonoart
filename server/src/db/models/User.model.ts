import type { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { D } from '@nono-art/domain';
import { uuidV4 } from '@nono-art/utils';

import { Level } from './Level.model';

interface Attributes extends D.UserDB {}

interface CreationAttributes extends Optional<Attributes, 'id' | 'role' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

@Table({
  tableName: 'users',
  freezeTableName: true,
  comment: 'пользователи',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<Attributes, CreationAttributes> implements D.UserDB {
  /* -------------------------------------------------------------------------- */
  /*                                   STATIC                                   */
  /* -------------------------------------------------------------------------- */

  public static association = {
    levelList: 'levelList' as const,
  };

  /* -------------------------------------------------------------------------- */
  /*                                  / STATIC                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 ATTRIBUTES                                 */
  /* -------------------------------------------------------------------------- */

  @PrimaryKey
  @Default(() => uuidV4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare readonly id: D.User.Id;

  /* -------------------------------------------------------------------------- */

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare readonly login: D.User.Login;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare readonly password: D.User.Password;

  /* -------------------------------------------------------------------------- */

  @Default(() => D.User.Role.user)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare readonly role: D.User.Role;

  /* -------------------------------------------------------------------------- */

  @CreatedAt
  declare readonly createdAt: D.User.CreatedAt;

  /* -------------------------------------------------------------------------- */

  @UpdatedAt
  declare readonly updatedAt: D.User.UpdatedAt;

  /* -------------------------------------------------------------------------- */

  @DeletedAt
  declare readonly deletedAt: D.User.DeletedAt;

  /* -------------------------------------------------------------------------- */
  /*                                / ATTRIBUTES                                */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                ASSOCIATIONS                                */
  /* -------------------------------------------------------------------------- */

  @HasMany(() => Level, {
    as: User.association.levelList,
    foreignKey: 'authorId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  readonly levelList?: ReadonlyArray<Level>;

  /* -------------------------------------------------------------------------- */
  /*                               / ASSOCIATIONS                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   PUBLIC                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  / PUBLIC                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  / PRIVATE                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  PROTECTED                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 / PROTECTED                                */
  /* -------------------------------------------------------------------------- */
}
