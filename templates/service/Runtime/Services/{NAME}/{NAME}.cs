using Zenject;
using {NAMESPACE}.Interfaces;

namespace {NAMESPACE}.Services
{
    /// \ingroup {NAMESPACE}
    /// 
    /// <summary>
    /// </summary>
    public class {NAME}: I{NAME}
    {
        internal static void InstallService(DiContainer container)
        {
            container.BindInterfacesTo<{NAME}>()
                .FromNew()
                .AsSingle()
                .NonLazy();
        }

        internal {NAME}()
        {
            
        }
    }
}