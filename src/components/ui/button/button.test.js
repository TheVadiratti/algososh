import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component tests', () => {

  it('button renders with text', () => {
    const button = renderer.create(<Button text='Text' />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('button renders without text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('button renders disabled', () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('button renders with loader', () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('button callback works correctly', () => {
    window.alert = jest.fn();
    render(<Button text='test button' onClick={alert('test')} />);
    const button = screen.getByText('test button');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('test');
  })
})