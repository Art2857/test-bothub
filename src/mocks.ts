import depfy from "depfy";

import * as IocModuleMailSender from "#ioc-modules/technicals/mail-sender";

/// TODO: add local settings for up mocks (dev customizations)

export const buildedListMocks = () => {
  const mocks = [] as depfy.ReplacementInjectedDescriptor[];

  mocks.push(IocModuleMailSender.injectorMock);

  return mocks;
};
