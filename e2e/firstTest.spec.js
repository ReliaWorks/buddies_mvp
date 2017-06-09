/* eslint-disable */
var admin = require("firebase-admin");

const uid = 'I8RddYjJ6ZPjS2ECmOO3PIcrxX43';
const affiliationsToAdd = ['Nike Run Club', 'Run and Chug'];

describe('Activity, Affiliations and Description empty state', () => {
  it('should go to edit profile page', async () => {
    await waitFor(element(by.id('profileIconButton'))).toExist().withTimeout(10000)
    await element(by.id('profileIconButton')).tap();

    await waitFor(element(by.id('userEditButton'))).toExist().withTimeout(10000)
    await element(by.id('userEditButton')).tap();
  });

  it('should remove all activities and affiliations', async () => {
    const count = await activityAndAffiliationsCount();

    console.log('will remove ', count, ' of activities and affiliations');

    for (var i = 0; i < count; i++) {
      //await waitFor(element(by.id('removeActivityIcon')).atIndex(0)).toBeVisible().withTimeout(10000); //.whileElement(by.id('ScrollView')).scroll(50, 'down');
      await element(by.id('removeActivityIcon')).atIndex(0).tap();
      await delay(800);
      await element(by.text('Remove')).tap()
      await delay(800);
    }
  });

  it('should replace description with -changed description text-', async () => {
    await element(by.id('descriptionTextInput')).replaceText('');
    await element(by.id('descriptionTextInput')).typeText('d');
  });

  it('should not be any activity or affiliation', async () => {
    await delay(2000)
    await expect(element(by.id('removeActivityIcon'))).toNotExist();
  });

  it('should render profile with zero activity and affiliation', async () => {
    await delay(1500);
    await element(by.id('profileIconButton')).tap();
    await waitFor(element(by.text('Update your profile'))).toExist().withTimeout(10000);
    await delay(1500);
    await element(by.text('Update your profile')).tap()
  });
});

describe('Add Affiliations', () => {
  it('should go to add affiliations page', async () => {
    await delay(1000);
    await waitFor(element(by.id('addAffiliationButton'))).toExist().withTimeout(10000);
    await element(by.id('addAffiliationButton')).tap();
  });

  it('should select two affiliations', async () => {
    for (var i in affiliationsToAdd) {
      const name = affiliationsToAdd[i];
      await waitFor(element(by.text(name))).toExist().withTimeout(10000);
      await element(by.text(name)).tap();
      await delay(300);
    }
  });
  it('should save previously selected affiliations', async () => {
    await element(by.text('Done')).atIndex(0).tap();
  });
});

describe('Add Activities', () => {
  it('should go to add activities page', async () => {
    await element(by.text('Add Activity')).tap();
  });
  it('should filter and add running activitiy without attribute', async () => {
    await delay(1000);
    await element(by.id('searchBarTextField')).replaceText('ru');
    await delay(500);
    await element(by.text('Running')).tap();
    await delay(1000);
    await element(by.text('Save')).tap()
  });
  it('should add Tennis activity with attribute 5.5', async () => {
    await element(by.id('searchBarTextField')).replaceText('');
    await delay(500);
    await element(by.text('Tennis')).tap();
    await delay(1000);
    await element(by.text('5.5')).tap();
    await delay(1000);
    await element(by.text('Save')).tap();
  });
  it('should add Swimming activity with attribute intermediate', async () => {
    await delay(1000);
    await element(by.text('Swimming')).tap();
    await delay(1000);
    await element(by.text('Intermediate')).tap();
    await delay(1000);
    await element(by.text('Save')).tap();
  });
  it('should add Biking activity without attribute by clicking cancel', async () => {
    await delay(1000);
    await element(by.text('Biking')).tap();
    await delay(1000);
    await element(by.text('Cancel')).tap();
  });
  it('should save activities', async () => {
    await delay(1000),
    await element(by.text('Done')).atIndex(0).tap();
  });
});

async function activityAndAffiliationsCount() {
  const snap1 = await admin.database().ref('/user_profiles/' + uid + '/activities').once('value');
  const snap2 = await admin.database().ref('/user_profiles/' + uid + '/affiliations').once('value');

  let i = 0;
  snap1.forEach((item) => {
    i++;
  });
  snap2.forEach((item) => {
    i++;
  });

  return i;
}

function delay(ms){
    var ctr, rej, p = new Promise(function (resolve, reject) {
        ctr = setTimeout(resolve, ms);
        rej = reject;
    });
    p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
    return p;
}
