export default {
  Query: {
    bloodRequests: async (parent, args, { models }) => {
      return await models.BloodRequest.findAll();
    },
    bloodRequest: async (parent, { id }, { models }) => {
      return await models.BloodRequest.findByPk(id);
    }
  },

  Mutation: {
    createBloodRequest: async (parent, { bloodGroup }, { me, models }) => {
      try {
        return await models.BloodRequest.create({
          bloodGroup,
          userId: me.id
        });
      } catch (error) {
        throw new Error(`#error: ${error}`);
      }
    },

    deleteBloodRequest: async (parent, { id }, { models }) => {
      return await models.BloodRequest.destroy({ where: { id } });
    }
  },

  BloodRequest: {
    user: async (bloodRequest, args, { models }) => {
      return await models.User.findByPk(bloodRequest.userId);
    }
  }
};
