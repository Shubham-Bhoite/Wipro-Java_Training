import { AppComponent } from './app.component';

describe('AppComponent Palindrome Test', () => {
  var component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('Test Case 1: palindrome word', () => {
    expect(component.isPalindrome('madam')).toBe(true);
  });

  it('Test Case 2: non-palindrome word', () => {
    expect(component.isPalindrome('hello')).toBe(false);
  });

  
});
