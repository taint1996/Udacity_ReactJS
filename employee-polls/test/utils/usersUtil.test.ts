import { sortedUsers } from '../../src/utils/usersUtil';
import { User } from '../../src/features/models/User';
// import { fileMocksJPG } from '../__mocks__/fileMocksJPG';

// Mock the users object
const users: Record<string, User> = {
  sarahedo: {
    id: 'sarahedo',
    password: '1234',
    name: 'Sarah Edo',
    avatarURL: '/assets/images/snow.jpg',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: '1234',
    name: 'Tyler McGinnis',
    avatarURL: '/assets/images/tyler.jpg',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  johndoe: {
    id: 'johndoe',
    password: '1234',
    name: 'John Doe',
    avatarURL: '/assets/images/leaf.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  }
};

describe('usersUtil', () => {
  test('sorts users based on questions and answers length', () => {
    const sorted = sortedUsers(Object.values(users));

    expect(sorted.map((user) => user.id)).toEqual([
      'sarahedo',
      'johndoe',
      'tylermcginnis'
    ]);
  });

  // test('showImageUser returns the correct image for the given avatarURL', () => {
  //   const snowImage = '../../src/assets/snow.jpg';
  //   const tylerImage = '../../src/assets/tyler.jpg';
  //   const leafImage = '../../src/assets/leaf.jpg';
  //   const unknownImage = '../../src/assets/snow.jpg';

  //   expect(snowImage).toEqual(fileMocksJPG.snow.src);
  //   expect(tylerImage).toEqual(fileMocksJPG.tyler.src);
  //   expect(leafImage).toEqual(fileMocksJPG.leaf.src);
  //   expect(unknownImage).toEqual(fileMocksJPG.snow.src);
  // });
});
