using Zenject;

namespace {NAMESPACE}
{
    /// \ingroup {NAMESPACE}
    /// 
    /// <summary>
    /// </summary>
    public class {NAME}Installer: Installer<{NAME}Installer>
    {
        public override void InstallBindings()
        {
            Container.BindFactory<{NAME}Controller, {NAME}Factory>()
                .FromSubContainerResolve()
                .ByMethod(InstallSubContainer)
                .AsSingle()
                .NonLazy();
        }

        private void InstallSubContainer(DiContainer subContainer)
        {
            subContainer.BindFactory<{NAME}Controller, {NAME}Factory>()
                .FromFactory<{NAME}Factory>();
        }
    }
}