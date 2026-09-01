import { useAiHook } from "@/hooks/useAiHook";
import { useState,useEffect,useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import Wrapper from "@/components/mainUi/WrapperPage";
import { SectionList, View ,Text, Pressable, ScrollView, TextInput, ActivityIndicator} from "react-native";
import { PERIODS } from "@/data";


export default function ai() {
  const { creatingInsights, foundInsights, insightsByPeriod, loading, error } = useAiHook();
  const { isDark } = useTheme();

  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [currentInsight, setCurrentInsight] = useState<InsightDataProps | null>(null);
  const [history, setHistory] = useState<InsightDataProps[]>([]);
  const [pageLoad, setPageLoad] = useState(false);

  // 1. Load history + check current on mount / period change
  useEffect(() => {
    const load = async () => {
      setPageLoad(true);
      try {
        // Fetch all history for this period type
        const list = await insightsByPeriod(selectedPeriod);
        setHistory(Array.isArray(list) ? list : []);

        console.log("all history:",list)

        // Check if there's an insight for the CURRENT time window
        const existing = await foundInsights(selectedPeriod);

        console.log("insight for current time:", existing)
        setCurrentInsight(existing)
      } catch (err) {
        console.log(err);
      } finally {
        setPageLoad(false);
      }
    };
    load();
  }, [selectedPeriod]);

  // 2. Generate handler
  const handleGenerate = async () => {
    setPageLoad(true);
    try {
      const created = await creatingInsights(selectedPeriod);
      console.log("create new:",created)
      if (created) {
        setCurrentInsight(created);
        // Refresh history
        const list = await insightsByPeriod(selectedPeriod);
        
        console.log("refresh history:", list)
        setHistory(Array.isArray(list) ? list : []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPageLoad(false);
    }
  };

  // 3. Derive sections for SectionList
  const sections = useMemo(() => {
    if (!history.length) return [];

    const getSectionTitle = (dateStr: string) => {
      const date = new Date(dateStr);
      switch (selectedPeriod) {
        case 'day':
          return `previous days`
        case 'week': {
          return `previous weeks`;
        }
        case 'month':
        default:
          return `previous months`
      }
    };

    const grouped = history.reduce((acc, item) => {
      const title = getSectionTitle(item.createdAt);
      if (!acc[title]) acc[title] = [];
      acc[title].push(item);
      return acc;
    }, {} as Record<string, InsightDataProps[]>);

    return Object.entries(grouped)
      .map(([title, data]) => ({ title, data }))
      .sort((a, b) => new Date(b.data[0].createdAt).getTime() - new Date(a.data[0].createdAt).getTime());
  }, [history, selectedPeriod]);

  useEffect(()=>{
    console.log("sections:",sections)
    console.log("currentInsights",currentInsight)
    console.log("historyCheck:",history)
  },[sections,selectedPeriod])


  return (
    <Wrapper loading={false}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        stickySectionHeadersEnabled={true}

        ListHeaderComponent={
          <View className="px-4 pt-2">
            {/* Title */}
            <Text className="text-[28px] font-bold text-[#152033] mb-1">AI Insights</Text>
            <Text className="text-[14px] text-[#64748B] mb-5">
              Personalized advice based on your spending
            </Text>

            {/* Period ScrollView */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
              contentContainerStyle={{ gap: 8 }}
            >
              {PERIODS.map((p) => (
                <Pressable
                  key={p.key}
                  onPress={() => setSelectedPeriod(p.key as Period)}
                  className="px-4 py-2 rounded-[10px] border"
                  style={{
                    backgroundColor: selectedPeriod === p.key ? '#208AEF' : isDark?'#3B3C40':'#fff',
                    borderColor: selectedPeriod === p.key ? '#208AEF' : isDark?'#191B1F':'#D9E2EF',
                  }}
                >
                  <Text
                    className="text-[13px] font-semibold"
                    style={{ color: selectedPeriod === p.key ? '#fff' : '#64748B' }}
                  >
                    {p.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Error */}
            {error && (
              <View className="bg-red-100 p-3 rounded-lg mb-4">
                <Text className="text-red-600 text-[13px]">{error}</Text>
              </View>
            )}

            {/* ─── HERO: Current Insight ─── */}
            {loading==true ?<ActivityIndicator/>: (currentInsight ? (
              <View className="bg-white rounded-2xl p-5 border border-[#E2E8F0] mb-5">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-[12px] text-[#208AEF] font-semibold">
                    Latest {selectedPeriod}ly Analysis
                  </Text>
                  <Text className="text-[11px] font-semibold text-red-400">
                    {currentInsight?.dateStart}
                  </Text>
                </View>
                <Text className="text-[15px] leading-6 text-[#334155]">
                  {currentInsight?.content}
                </Text>

                {/* Stats */}
                <View className="flex-row gap-2.5 mt-4">
                  <StatCard label="Income" value={`$${currentInsight?.summary.income}`} color="#10B981" />
                  <StatCard label="Spent" value={`$${currentInsight?.summary.expense}`} color="#EF4444" />
                  <StatCard label="Saved" value={`$${currentInsight?.summary.savings}`} color="#208AEF" />
                </View>
              </View>
            ) : (
              <View className="bg-white rounded-2xl p-6 border border-[#E2E8F0] mb-5 items-center">
                <Text className="text-[15px] text-[#64748B] mb-4 text-center">
                  No insight yet for this {selectedPeriod}
                </Text>
                <Pressable
                  onPress={handleGenerate}
                  className="bg-[#208AEF] px-6 py-3 rounded-xl"
                >
                  <Text className="text-white font-semibold text-[14px]">Generate Insight</Text>
                </Pressable>
              </View>
            ))}

            {/* SectionList title if history exists */}
            {sections.length > 0 && (
              <Text className="text-[18px] font-bold text-[#152033] mb-3 mt-2">
                History
              </Text>
            )}
          </View>
        }

        // ─── SECTION HEADERS: Monday / Week 32 / August 2026 ───
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-4 py-2 bg-[#F8FBFF] mb-4">
            <Text className="text-[14px] font-bold text-[#152033]">{title}</Text>
          </View>
        )}

        // ─── ROWS: Individual insights ───
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mx-4 mb-3 border border-[#E2E8F0] ">
            <View className="flex-row justify-between">
              <Text className="text-[11px] text-black ">
                {item.dateEnd}
              </Text>
            </View>
            <Text className="text-[14px] leading-5 text-[#475569]" numberOfLines={2}>
              {item.content}
            </Text>
            <View className="flex-row mt-2 gap-3">
              {/* <Text className="text-[12px] text-green-500">+${item.summary.income}</Text> */}
              {/* <Text className="text-[12px] text-red-500">-${item.summary.expense}</Text> */}
            </View>
          </View>
        )}

        ListEmptyComponent={
          <View className="py-10 items-center">
            <Text className="text-[#64748B] text-[14px]">No insights yet</Text>
          </View>
        }
      />
    </Wrapper>
  );
}

export const StatCard=({label,color,value}:{label:string,color:string,value:string})=>{
  return(
    <View className={`${color}`}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  )
}