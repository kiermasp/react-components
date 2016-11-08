import {default as Range} from 'utils/Range'

describe('Range ', () => {

  context('Constructor', () => {

    let range;
    before(() => {
      range = new Range();
    })

    context('Default values', () => {

      it('value should be set to 0', () => {
        expect(range.value).to.equal(0);
      });

      it('minimum should be set to 0', () => {
        expect(range.minimum).to.equal(0);
      });

      it('maximum should be set to 100', () => {
        expect(range.maximum).to.equal(100);
      });

      it('should have default stepSize set to 1', () => {
        expect(range.stepSize).to.equal(1);
      });

      it('should have default snapInterval set to 1', () => {
        expect(range.snapInterval).to.equal(1);
      });
    })

  })
})
