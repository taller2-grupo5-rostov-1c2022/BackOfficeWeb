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

    if (!data.provider[provider])
      data.provider[provider] = {
        total: 0,
        details: {},
      };
    ++data.provider[provider].total;

    if (!data.role[role])
      data.role[role] = {
        total: 0,
        details: {},
      };
    ++data.role[role].total;

    const creation = new Date(user?.metadata?.creationTime ?? null);
    const signIn = new Date(user?.metadata?.lastSignInTime ?? null);

    daysAgo.forEach(({ days, date }) => {
      const str_days = String(days);
      if (creation >= date) {
        if (!data.new[str_days])
          data.new[str_days] = {
            total: 0,
            details: {},
          };
        const details = data.new[str_days].details;
        ++data.new[str_days].total;
        // @ts-ignore
        ++details["r " + role] || (details["r " + role] = 1);
        // @ts-ignore
        ++details["p " + provider] || (details["p " + provider] = 1);
      }
      if (signIn >= date) {
        if (!data.signedIn[str_days])
          data.signedIn[str_days] = {
            total: 0,
            details: {},
          };
        const details = data.signedIn[str_days].details;
        ++data.signedIn[str_days].total;
        // @ts-ignore
        ++details["r " + role] || (details["r " + role] = 1);
        // @ts-ignore
        ++details["p " + provider] || (details["p " + provider] = 1);
      }
    });
  });

  ["new", "signedIn"].forEach((att) => {
    daysAgo.forEach(({ days }) => {
      // @ts-ignore
      const details = data[att][days].details;
      details.roles = {};
      details.providers = {};

      Object.keys(details).forEach((key) => {
        if (key === "roles" || key === "providers") return;

        const [type, name] = key?.split(" ");

        if (type === "p") details.providers[name] = details[key];

        if (type === "r") details.roles[name] = details[key];
      });

      details.description = "Providers";
      Object.keys(details.providers).forEach((provider) => {
        details.description +=
          "\n• " + details.providers[provider] + " using " + provider;
      });
      details.description += "\nRoles";
      Object.keys(details.roles).forEach((role) => {
        const s = details.roles[role] > 1 ? "s" : "";
        details.description += "\n• " + details.roles[role] + " " + role + s;
      });
    });
  });

  return data;
};
