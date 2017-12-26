# coding: utf-8
import functools
import numpy

__author__ = "Laite Sun"
__copyright__ = "Copyright 2016-2019, ShangHai Lie Ying"
__license__ = "Private"
__email__ = "sunlt@lieying.cn"
__date__ = "2017-10-09 11:45"


def deco(func):
    @functools.wraps(func)
    def wrapper(b):
        b += '++'
        return func(b)
    return wrapper

numpy.genfromtxt()

@deco
def a(b):
    print b

class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        l = ['(', '{', '[']
        r = [')', '}', ']']
        tmp = []
        for i in s:
            if i in l:
                tmp.append(i)
            elif i in r:
                if not tmp:
                    return False
                t = tmp.pop()
                if i==')' and t !='(':
                    print 'sb'
                    return False
                elif i=='}' and t!='{':
                    print 'sb2'
                    return False
                elif i==']' and t!='[':
                    print 'sb3'
                    return False
        if tmp:
            return False
        return True

if __name__ == '__main__':
    s = Solution()
    print s.isValid('()[]{}')