import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import type { D } from '@nono-art/domain';
import { uuidV4 } from '@nono-art/utils';

interface Attributes extends D.UserDB {}

interface CreationAttributes extends Optional<Attributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

@Table({
  tableName: 'users',
  freezeTableName: true,
  comment: 'пользователи',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<Attributes, CreationAttributes> implements D.UserDB {
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
  readonly login!: D.User.Login;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  readonly password!: D.User.Password;

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
