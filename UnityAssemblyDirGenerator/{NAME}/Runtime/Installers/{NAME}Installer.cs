using RiskyTools.Data.Services;
using Zenject;

namespace RiskyToolsPackage.Runtime.Data.Installers
{
    public class DataObjectsInstaller: Installer<DataObjectsInstaller>
    {
        public override void InstallBindings()
        {
            Container.BindInterfacesAndSelfTo<DataMessagingService>()
                .FromNew()
                .AsSingle()
                .NonLazy();

        }
    }
}