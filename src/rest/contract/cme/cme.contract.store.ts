import { TradeInterface } from "../../trade";
import { CME_CONTRACTS } from "./cme.contract.constants";
import { CmeContractInterface } from "./cme.contract.interface";
import { CmeContractSectorEnum } from "./sector/cme.contract.sector.enum";
import { CmeContractSectorGroupInterface } from "./sector/group/cme.contract.sector.group.interface";
import { CmeTradeSectorGroupInterface } from "./sector/group/cme.trade.sector.group.interface";
import { CmeContractSymbolEnum } from "./symbol/cme.contract.symbol.enum";

export class CmeContractStore {
  static getContracts(): CmeContractInterface[] {
    return CME_CONTRACTS;
  }

  static getContractsBySector(): CmeContractSectorGroupInterface[] {
    const sectors = [...new Set(CME_CONTRACTS.map((c) => c.sector))];
    return sectors.map((sector) => ({
      sector,
      contracts: CME_CONTRACTS.filter((c) => c.sector === sector),
    }));
  }

  static getContractBySymbol(
    symbol: CmeContractSymbolEnum,
  ): CmeContractInterface | undefined {
    return CME_CONTRACTS.find((c) => c.symbol === symbol);
  }

  static getSectors(): CmeContractSectorEnum[] {
    return [...new Set(CME_CONTRACTS.map((c) => c.sector))];
  }

  static matchTradeNameToContract(
    trade: TradeInterface,
  ): CmeContractInterface | undefined {
    // Extract the first 2-3 characters from the contractId
    const contractSymbol = trade.contractId
      .substring(0, 3)
      .toUpperCase() as CmeContractSymbolEnum;

    // Try to find a contract with this globex code
    const contract = CME_CONTRACTS.find((c) => c.symbol === contractSymbol);

    // If not found with 3 characters, try 2 characters
    if (!contract) {
      const twoCharCode = contractSymbol.substring(0, 2);
      return CME_CONTRACTS.find((c) => c.symbol === twoCharCode);
    }

    return contract;
  }

  static groupTradesBySector(
    trades: TradeInterface[] = [],
  ): CmeTradeSectorGroupInterface[] {
    // Create a map to group trades by sector
    const sectorMap = new Map<CmeContractSectorEnum, TradeInterface[]>();

    // Initialize the map with empty arrays for each sector
    this.getSectors().forEach((sector) => {
      sectorMap.set(sector, []);
    });

    // Group trades by sector
    trades.forEach((trade) => {
      const contract = this.matchTradeNameToContract(trade);
      if (contract) {
        const sectorTrades = sectorMap.get(contract.sector) || [];
        sectorTrades.push(trade);
        sectorMap.set(contract.sector, sectorTrades);
      }
    });

    // Convert map to array of SectorTradeGroup, ensuring all sectors are included
    return this.getSectors().map((sector) => ({
      sector,
      trades: sectorMap.get(sector) || [],
    }));
  }

  static matchContractNameToGlobexCode(
    contractName: string,
  ): CmeContractInterface | undefined {
    // Try to find a contract with this globex code
    return CME_CONTRACTS.find((c) => contractName.startsWith(c.symbol));
  }
}
