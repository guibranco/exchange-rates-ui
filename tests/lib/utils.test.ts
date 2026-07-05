import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('joins multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('omits falsy values', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar');
  });

  it('merges conflicting tailwind classes, keeping the last one', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('applies conditional classes from objects', () => {
    expect(cn('base', { active: true, hidden: false })).toBe('base active');
  });
});
