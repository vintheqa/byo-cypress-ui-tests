import { BaseObject, PageObject} from "../support/pageObjects"

const $BaseObject = new BaseObject();
const $PageObject = new PageObject();

describe("Build Your Own WRX", () => {
  before(() => {
    $PageObject.goToRootPage();
  });

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.clickBuildYourOwnFromMegaNav();
    $PageObject.selectVehicleFromConfigurePage('wrx');
  });

});
