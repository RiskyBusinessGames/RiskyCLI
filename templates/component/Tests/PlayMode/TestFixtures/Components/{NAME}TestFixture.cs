using System;
using UnityEngine;
using NUnit.Framework;
using Zenject;

namespace {NAMESPACE}
{
    internal abstract class {NAME}TestFixture: ZenjectIntegrationTestFixture
    {
        protected {NAME}Factory _factory;

        public {NAME}TestFixture()
        {
            // TODO: setup test fixture
            Debug.Log("{NAME}TestFixture: ctor");
        }

        [SetUp]
        public void PreTest()
        {
            PreInstall();

            {NAME}Installer.Install(Container);

            PostInstall();

            _factory = Container.Resolve<{NAME}Factory>();
            
            Debug.Log("{NAME}TestFixture: SetUp");
        }

        [TearDown]
        public void TearDown()
        {
            // TODO: cleanup after tests

            Debug.Log("{NAME}TestFixture: TearDown");
        }
    }
}