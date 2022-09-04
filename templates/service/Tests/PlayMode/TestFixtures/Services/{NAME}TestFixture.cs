using System;
using UnityEngine;
using NUnit.Framework;
using {NAMESPACE}.Services;
using {NAMESPACE}.Interfaces;
using {NAMESPACE}.Installers;
using Zenject;

namespace {NAMESPACE}.Services
{
    internal abstract class {NAME}TestFixture: ZenjectIntegrationTestFixture
    {
        protected {NAME} _service;

        public {NAME}TestFixture()
        {
            // TODO: setup test fixture
            throw new NotImplementedException();
            Debug.Log("{NAME}TestFixture: ctor");
        }

        [SetUp]
        public void PreTest()
        {
            throw new NotImplementedException();

            PreInstall();

            // TODO: Install service under test

            PostInstall();
            
            _service = Container.Resolve<{NAME}>();
            
            Debug.Log("{NAME}TestFixture: SetUp");
        }

        [TearDown]
        public void TearDown()
        {
            throw new NotImplementedException();

            // TODO: cleanup after tests

            Debug.Log("{NAME}TestFixture: TearDown");
        }
    }
}