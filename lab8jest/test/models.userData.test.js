const User = require('../models/user');
const UserData = require('../models/userData');

// Count method
describe('Count user', () => {
    test('default user count', () => {
      testUserData = new UserData();  
      const userCount = testUserData.getUserCount();
      expect(userCount).toEqual(4);
    })

    test('clear user and Count', () => {
        testUserData = new UserData(); 
        testUserData.clearUsers()
        const userCount = testUserData.getUserCount();
        expect(userCount).toEqual(0);
    
    })
})

// Remove user
describe('remove user', () => {
    test('Remove one', () => {
      testUserData = new UserData();
      const userCountBefore = testUserData.getUserCount();
      testUserData.removeOneUser();
      const userCountAfter = testUserData.getUserCount();
      const difUser = userCountBefore - userCountAfter;
      expect(difUser).toEqual(1);
    })

    test('Remove two', () => {
      testUserData = new UserData();
      const userCountBefore = testUserData.getUserCount();
      testUserData.removeTwoUser();
      const userCountAfter = testUserData.getUserCount();
      const difUser = userCountBefore - userCountAfter;
      expect(difUser).toEqual(2);
    })
})

describe('get user', () => {
  test('get valid user by email after add one', () => {
    testUserData = new UserData();
    
    const targetUser = "Jane"
    const targetEmail = "jane@example.com"
    testUserData.addUser({ "name": targetUser, "email": targetEmail })
    
    let findUser = testUserData.findUserByEmail(targetEmail)
    expect(findUser).toEqual(targetUser)
  })
  
  test('get valid user by email', () => {
    testUserData = new UserData();
    const targetUser = "Alice"
    const targetEmail = "alice@example.com"
    let findUser = testUserData.findUserByEmail(targetEmail)
    expect(findUser).toEqual(targetUser)
  })

  test('get invalid user by email', () => {
    testUserData = new UserData();
    const targetUser = ""
    const targetEmail = "something-wrong@example.com"
    const findUser = testUserData.findUserByEmail(targetEmail)
    expect(findUser).toEqual(null)
  })
})