using System;
using System.ComponentModel.Design;
using System.Reflection;

namespace RiskyTools.Tests.TestUtilities
{
    public static class TestReflectionUtility
    {
        public static TReturn GetNonPublicInstanceField<TReturn, TClass>(string name, TClass obj)
        {
            return GetField<TReturn, TClass>(name, obj, BindingFlags.NonPublic | BindingFlags.Instance);
        }
        
        public static TReturn GetNonPublicStaticField<TReturn, TClass>(string name, TClass obj)
        {
            return GetField<TReturn, TClass>(name, obj, BindingFlags.NonPublic | BindingFlags.Static);
        }

        public static void SetNonPublicInstanceField<TClass, TField>(string name, TClass obj, TField value)
        {
            SetField<TClass, TField>(name, obj, value, BindingFlags.NonPublic | BindingFlags.Instance);
        }
        
        public static void SetNonPublicStaticField<TClass, TField>(string name, TClass obj, TField value)
        {
            SetField<TClass, TField>(name, obj, value, BindingFlags.NonPublic | BindingFlags.Static);
        }

        public static MethodInfo GetNonPublicInstanceMethod<TClass>(string name, TClass obj)
        {
            return GetMethod(name, obj, BindingFlags.NonPublic | BindingFlags.Instance);
        }
        
        public static MethodInfo GetNonPublicStaticMethod<TClass>(string name, TClass obj)
        {
            return GetMethod(name, obj, BindingFlags.NonPublic | BindingFlags.Static);
        }
        
        private static TReturn GetField<TReturn, TClass>(string name, TClass obj, BindingFlags flags)
        {
            FieldInfo fieldInfo = typeof(TClass).GetField(name, flags);

            if (fieldInfo != null)
            {
                TReturn value = (TReturn) fieldInfo.GetValue(obj);

                if (value != null)
                {
                    return value;
                }
            }

            throw new Exception($"TestReflectionUtility: Field [{typeof(TReturn)} {name}] does not exist on {obj}");
        }

        private static void SetField<TClass, TField>(string name, TClass obj, TField value, BindingFlags flags)
        {
            FieldInfo fieldInfo = typeof(TClass).GetField(name, flags);

            if (fieldInfo != null)
            {
                if (fieldInfo.FieldType != typeof(TField))
                {
                    throw new Exception($"TestReflectionUtility: Object {obj} Field {name} type mismatch ({typeof(TField)} != {fieldInfo.FieldType}]");
                }

                fieldInfo.SetValue(obj, value);
            }
            else
            {
                throw new Exception($"TestReflectionUtility: Field [{typeof(TField)} {name}] does not exist on {obj}");
            }
        }

        private static MethodInfo GetMethod<TClass>(string name, TClass obj, BindingFlags bindingFlags)
        {
            MethodInfo methodInfo = typeof(TClass).GetMethod(name, bindingFlags);

            if (methodInfo != null)
            {
                return methodInfo;
            }

            throw new Exception($"TestReflectionUtility: Method[{name}] does not exist on {obj}");
        }

    }
}