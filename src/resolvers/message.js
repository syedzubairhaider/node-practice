import { ForbiddenError } from "apollo-server";

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    }
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      try {
        if (!me) {
          throw new ForbiddenError("Not authenticated as user.");
        }

        return await models.Message.create({
          text,
          userId: me.id
        });
      } catch (error) {
        throw new Error(`#error: ${error}`);
      }
    },

    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    }
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    }
  }
};
