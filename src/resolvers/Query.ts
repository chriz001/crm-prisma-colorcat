import { prisma } from '../../generated/prisma-client';

export interface UserDetail {
  id: String;
  name: String;
  vipLevel: String;
  age: String;
  where: String;
  bigFrom: String;
  mainProject: String;
  createdAt: String;
  sex: String;
}

const Query = {
  usersDetailWDView: async () => {
    const ret = [];
    let users = await prisma.userBasics();
    for (const user of users) {
      const consultations = await prisma.consultingRecords({
        where: { user: { id: user.id } },
        first: 1
      });
      const consultationCount = await prisma
        .consultingRecordsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      const bookingCount = await prisma
        .bookingRecordsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      const billsCount = await prisma
        .billsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      ret.push({
        ...user,
        firstAdvisoryWay:
          consultations.length !== 0 ? consultations[0].advisoryWay : "",
        consultationCount,
        bookingCount,
        billsCount
      });
    }
    return ret;
  },
  userBasics: async () => await prisma.userBasics(),
  consultingRecords: async () => await prisma.consultingRecords(),
  bookingRecords: async () => await prisma.bookingRecords(),
  dictionaries: async () => await prisma.dictionaries(),
  ads: async () => await prisma.ads(),
  adConsumptions: async () => await prisma.adConsumptionRecs(),
  consultationWorks: async () => await prisma.consultationWorks(),
  admins: async () => await prisma.admins(),
  departments: async () => await prisma.departments(),
  bills: async () => await prisma.bills(),
  agencies: async () => await prisma.agencies()
};

export default Query;
