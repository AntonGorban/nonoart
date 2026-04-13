import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import type { D } from '@nono-art/domain';
import { uuidV4 } from '@nono-art/utils';

import { environment } from '../../environment';

import { User } from './User.model';

interface Attributes extends D.LevelDB {}

interface CreationAttributes extends Optional<Attributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

@Table({
  tableName: 'levels',
  freezeTableName: true,
  comment: 'уровни',
  timestamps: true,
  paranoid: true,
})
export class Level extends Model<Attributes, CreationAttributes> implements D.LevelDB {
  /* -------------------------------------------------------------------------- */
  /*                                   STATIC                                   */
  /* -------------------------------------------------------------------------- */

  public static association = {
    author: 'author' as const,
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
  declare readonly id: D.Level.Id;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare readonly name: D.Level.Name;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare readonly description: D.Level.Description;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.STRING(7),
    allowNull: false,
    validate: {
      isHexColor(value: string) {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          throw new Error('Цвет должен быть в формате #RRGGBB (например, #FF0000)');
        }
      },
    },
  })
  declare readonly color0: D.Level.Color;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.STRING(7),
    allowNull: false,
    validate: {
      isHexColor(value: string) {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          throw new Error('Цвет должен быть в формате #RRGGBB (например, #00FF00)');
        }
      },
    },
  })
  declare readonly color1: D.Level.Color;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.STRING(7),
    allowNull: false,
    validate: {
      isHexColor(value: string) {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          throw new Error('Цвет должен быть в формате #RRGGBB (например, #0000FF)');
        }
      },
    },
  })
  declare readonly color2: D.Level.Color;

  /* -------------------------------------------------------------------------- */

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    validate: {
      isValidGrid(value: unknown) {
        // 1. Проверка, что значение — массив
        if (!Array.isArray(value)) {
          throw new Error('grid должен быть массивом');
        }

        const rowCount = value.length;

        // 2. Проверка минимального и максимального количества строк
        if (rowCount < MIN_ROWS) {
          throw new Error(`grid должен содержать хотя бы ${MIN_ROWS} строк(у). Сейчас строк: ${rowCount}`);
        }
        if (rowCount > MAX_ROWS) {
          throw new Error(`grid не может содержать более ${MAX_ROWS} строк. Сейчас строк: ${rowCount}`);
        }

        // 3. Если массив пустой — проверки колонок пропускаем
        if (rowCount === 0) {
          return;
        }

        const firstRow = value[0];
        if (!Array.isArray(firstRow)) {
          throw new Error('Каждая строка grid должна быть массивом');
        }

        const colCount = firstRow.length;

        // 4. Проверка минимального и максимального количества столбцов
        if (colCount < MIN_COLS) {
          throw new Error(
            `Каждая строка должна содержать хотя бы ${MIN_COLS} столбцов(а). Сейчас столбцов: ${colCount}`,
          );
        }
        if (colCount > MAX_COLS) {
          throw new Error(`Каждая строка не может содержать более ${MAX_COLS} столбцов. Сейчас столбцов: ${colCount}`);
        }

        // 5. Проверка каждой строки
        for (let i = 0; i < rowCount; i++) {
          const row = value[i];

          if (!Array.isArray(row)) {
            throw new Error(`Строка ${i} в grid должна быть массивом`);
          }

          // Проверка одинаковой длины строк
          if (row.length !== colCount) {
            throw new Error(
              `Строка ${i} имеет длину ${row.length}, ожидается ${colCount}. ` +
                `Все строки в grid должны быть одинаковой длины.`,
            );
          }

          // Проверка значений ячеек
          for (let j = 0; j < colCount; j++) {
            const cell = row[j];
            if (cell !== null && cell !== 0 && cell !== 1 && cell !== 2) {
              throw new Error(
                `Недопустимое значение в ячейке [${i}][${j}]: ${cell}. ` + `Разрешены только 0, 1, 2 или null.`,
              );
            }
          }
        }
      },
    },
  })
  declare readonly grid: D.Level.Grid;

  /* -------------------------------------------------------------------------- */

  @CreatedAt
  declare readonly createdAt: D.Level.CreatedAt;

  /* -------------------------------------------------------------------------- */

  @UpdatedAt
  declare readonly updatedAt: D.Level.UpdatedAt;

  /* -------------------------------------------------------------------------- */

  @DeletedAt
  declare readonly deletedAt: D.Level.DeletedAt;

  /* -------------------------------------------------------------------------- */
  /*                                / ATTRIBUTES                                */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                ASSOCIATIONS                                */
  /* -------------------------------------------------------------------------- */

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  declare readonly authorId: D.Level.AuthorID | null;

  @BelongsTo(() => User, { as: Level.association.author, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  author?: User | null;

  /* -------------------------------------------------------------------------- */
  /*                               / ASSOCIATIONS                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   PUBLIC                                   */
  /* -------------------------------------------------------------------------- */

  public get colors(): D.Level.Colors {
    return [this.color0, this.color1, this.color2];
  }

  /* -------------------------------------------------------------------------- */

  public get gridRowsCount(): number {
    return this.grid.length;
  }

  /* -------------------------------------------------------------------------- */

  public get gridColsCount(): number {
    return this.grid[0]?.length ?? 0;
  }

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

const MAX_ROWS = environment.LEVEL_GRID_ROW_MAX;
const MIN_ROWS = environment.LEVEL_GRID_ROW_MIN;
const MAX_COLS = environment.LEVEL_GRID_COL_MAX;
const MIN_COLS = environment.LEVEL_GRID_COL_MIN;
