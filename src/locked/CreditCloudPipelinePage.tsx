import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'
import { useNavigation } from '../contexts/NavigationContext'

export default function CreditCloudPipelinePage() {
  const {
    isNavExpanded,
    setIsNavExpanded,
    intelExpanded,
    setIntelExpanded,
    covenantsExpanded,
    setCovenantsExpanded,
    sourceFilesExpanded,
    setSourceFilesExpanded,
    companiesExpanded,
    setCompaniesExpanded,
    creditCloudExpanded,
    setCreditCloudExpanded,
    findoxExpanded,
    setFindoxExpanded,
    resourcesExpanded,
    setResourcesExpanded
  } = useNavigation()

  return (
    <div className="h-screen flex bg-[#EFF0FF] overflow-hidden">
      <SharedNavigation
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setIsNavExpanded}
        intelExpanded={intelExpanded}
        setIntelExpanded={setIntelExpanded}
        covenantsExpanded={covenantsExpanded}
        setCovenantsExpanded={setCovenantsExpanded}
        sourceFilesExpanded={sourceFilesExpanded}
        setSourceFilesExpanded={setSourceFilesExpanded}
        companiesExpanded={companiesExpanded}
        setCompaniesExpanded={setCompaniesExpanded}
        creditCloudExpanded={creditCloudExpanded}
        setCreditCloudExpanded={setCreditCloudExpanded}
        findoxExpanded={findoxExpanded}
        setFindoxExpanded={setFindoxExpanded}
        resourcesExpanded={resourcesExpanded}
        setResourcesExpanded={setResourcesExpanded}
      />

      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <SharedTopBar />

        <div className="flex-1 relative overflow-hidden">
          {/* Background content blur */}
          <div className="absolute inset-0 blur-sm opacity-30">
            <div className="p-8">
              <div className="bg-white rounded-xl p-6 shadow-sm h-40"></div>
            </div>
          </div>

          {/* Modal overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-8">
            <div
              className="rounded-xl shadow-2xl w-[75vw] overflow-hidden relative py-[25px]"
              style={{
                backgroundImage: 'url(/private-credit-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-blue-900/60" />
              <div className="relative px-8 text-center">
                <div className="bg-blue-800/70 rounded-lg p-2 mb-8 mx-auto max-w-2xl">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src="/private-credit-video.png" alt="Video" className="block w-full h-auto" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="bi bi-play-circle-fill text-white text-6xl" />
                    </div>
                  </div>
                </div>

                <h2 className="text-base font-bold text-white mb-4">Unlock Credit Cloud Pipeline</h2>
                <p className="text-white text-sm mb-8 max-w-2xl mx-auto">
                  Gain access to exclusive insights that can improve your workflows. Simply request access below and a member of our team will contact you shortly.
                </p>

                <div className="flex justify-center gap-4">
                  <button className="border border-white text-white px-[12px] py-[7px] rounded-full text-sm hover:bg-white hover:text-blue-900 transition-colors flex items-center gap-2">
                    <i className="bi bi-download"></i>
                    Download Flyer
                  </button>
                  <button className="border border-white text-white px-[12px] py-[7px] rounded-full text-sm hover:bg-white hover:text-blue-900 transition-colors">
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



