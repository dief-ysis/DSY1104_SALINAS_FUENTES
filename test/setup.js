import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

jest.mock('./fileMock.js', () => 'test-file-stub');
configure({
  testIdAttribute: 'data-testid',
});