const createToken = async user => {
  // ...
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      // return Object.values(models.users);
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      // return models.users[id];
      return await models.User.findByPk(id);
    },
    me: async (parent, args, { me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findByPk(me.id);
    }
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { models }) => {
      const user = await models.User.create({
        username,
        email,
        password
      });

      return { token: createToken(user) };
    }
  },

  User: {
    messages: async (user, args, { models }) => {
      // return Object.values(models.messages).filter(
      //   message => message.userId === user.id
      // );
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
