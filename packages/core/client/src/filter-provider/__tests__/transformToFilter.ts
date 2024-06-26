/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { transformToFilter } from '../utils';

// TODO: 前端测试报错解决之后，把该文件重命名为 transformToFilter.test.ts
describe('transformToFilter', () => {
  it('should transform to filter', () => {
    const values = {
      name: 'name',
      email: 'email',
      user: {
        name: 'name',
      },
      list: [{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }],
    };

    const fieldSchema = {
      'x-filter-operators': {
        name: '$eq',
        email: '$eq',
      },
    };

    const getField = (name: string) => {
      if (name === 'user' || name === 'list') {
        return {
          targetKey: 'name',
        };
      }
      return {
        targetKey: undefined,
      };
    };

    expect(transformToFilter(values, fieldSchema as any, getField)).toEqual({
      $and: [
        {
          name: {
            $eq: 'name',
          },
        },
        {
          email: {
            $eq: 'email',
          },
        },
        {
          'user.name': {
            $eq: 'name',
          },
        },
        {
          'list.name': {
            $eq: ['name1', 'name2', 'name3'],
          },
        },
      ],
    });
  });
});
