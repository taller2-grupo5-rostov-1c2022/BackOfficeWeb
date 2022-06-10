import { AuthUserType, MetricsData } from "../util/types";

const daysAgo = [1, 3, 7, 15, 30].map((days) => {
  let date = new Date();
  date.setDate(date.getDate() - days);
  return { days, date };
});

export const userMetrics = (users: AuthUserType[]) => {
  const total = users?.length;
  if (!(total >= 0)) return;

  const data: MetricsData = {
    total,
    disabled: 0,
    provider: {},
    role: {},
    new: {},
    signedIn: {},
  };

  users?.forEach((user) => {
    // Note on ts-ignore : if undefined will return NaN, which is then handled

    if (user?.disabled) ++data.disabled;

    const provider = user?.providerData[0]?.providerId;
    const role = user?.customClaims?.role ?? "listener";

    // @ts-ignore
    ++data.provider[provider] || (data.provider[provider] = 1);

    // @ts-ignore
    ++data.role[role] || (data.role[role] = 1);

    const creation = new Date(user?.metadata?.creationTime ?? null);
    const signIn = new Date(user?.metadata?.lastSignInTime ?? null);

    daysAgo.forEach(({ days, date }) => {
      if (creation >= date)
        // @ts-ignore
        ++data.new[String(days)] || (data.new[String(days)] = 1);
      if (signIn >= date)
        // @ts-ignore
        ++data.signedIn[String(days)] || (data.signedIn[String(days)] = 1);
    });
  });

  return data;
};
