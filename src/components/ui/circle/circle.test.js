import renderer from 'react-test-renderer';
import { Circle } from './circle';

describe('Circle component tests', () => {

  it('circle renders without symbol', () => {
    const button = renderer.create(<Circle />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with symbol', () => {
    const button = renderer.create(<Circle letter='A' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with head', () => {
    const button = renderer.create(<Circle head='HEAD' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with react-component head', () => {
    const button = renderer.create(<Circle head={<p>TEST</p>} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with tail', () => {
    const button = renderer.create(<Circle tail='HEAD' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with react-component tail', () => {
    const button = renderer.create(<Circle tail={<p>TEST</p>} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders with index', () => {
    const button = renderer.create(<Circle index={1} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders isSmall', () => {
    const button = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders default', () => {
    const button = renderer.create(<Circle state='default' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders changing', () => {
    const button = renderer.create(<Circle state='changing' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('circle renders modified', () => {
    const button = renderer.create(<Circle state='modified' />).toJSON();
    expect(button).toMatchSnapshot();
  })
})