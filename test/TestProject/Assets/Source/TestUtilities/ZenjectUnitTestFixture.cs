using NUnit.Framework;
using Zenject;

namespace RiskyTools.Tests.TestUtilities
{
    public abstract class ZenjectUnitTestFixture
    {
        DiContainer _container;

        protected DiContainer Container
        {
            get
            {
                return _container;
            }
        }

        [SetUp]
        public virtual void Setup()
        {
            _container = new DiContainer();
        }
    }
}